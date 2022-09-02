import { useEffect, useRef } from "react";
import { useSetState } from "react-use";
import cuid from "cuid";
export default function App() {
  const incomeRef = useRef();
  const expenseRef = useRef();

  const [state, setState] = useSetState(() =>
    JSON.parse(
      localStorage.getItem("state") ||
        JSON.stringify({ income: [], expense: [] })
    )
  );
  const addIncome = (e) => {
    e.preventDefault();
    setState((prev) => ({
      income: [
        ...prev.income,
        {
          description: e.target.description.value,
          amount: e.target.income.value,
          id: cuid()
        }
      ]
    }));
  };
  const addExpense = (e) => {
    e.preventDefault();
    setState((prev) => ({
      expense: [
        ...prev.expense,
        {
          description: e.target.description.value,
          amount: e.target.expense.value,
          id: cuid()
        }
      ]
    }));
  };

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
    // }
  }, [state, setState]);
  const deleteAmount = (id, type) => {
    setState((prev) => ({
      [type]: prev[type].filter((v) => v.id !== id)
    }));
  };

  const clearStore = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div style={{ margin: "0 auto", fontFamily: "sans-serif" }}>
      <div>
        <div>
          <p>Total Income:</p>
          {state.income.map((v) => {
            return (
              <div
                key={v.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0.5em 0"
                }}
              >
                <div>
                  {v.description}: {price(+v.amount)}
                </div>
                <button
                  style={{ marginLeft: "1em" }}
                  onClick={() => deleteAmount(v.id, "income")}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
        <h4 style={{ color: "green" }}>
          You have:{" "}
          {price(
            +state.income.reduce((a, v) => a + +v.amount, 0) -
              +state.expense.reduce((a, v) => a + +v.amount, 0)
          )}
        </h4>
        <div>
          {/* {" "} */}
          <p>Total Expense:</p>

          {state.expense.map((v) => {
            return (
              <div
                key={v.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0.5em 0"
                }}
              >
                <div>
                  {v.description}: {price(+v.amount)}{" "}
                </div>
                <button
                  style={{ marginLeft: "1em" }}
                  onClick={() => deleteAmount(v.id, "expense")}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <form style={{ margin: "2em 0" }} onSubmit={addIncome} ref={incomeRef}>
          <input name="description" type="text" placeholder="description" />
          <br />
          <input
            style={{ margin: "0.5em 0" }}
            name="income"
            type="number"
            placeholder="income amount"
          />
          <br />

          <button style={{ margin: "0.5em 0" }} type="submit">
            add
          </button>
        </form>
        <form onSubmit={addExpense} ref={expenseRef}>
          <input name="description" type="text" placeholder="description" />
          <br />

          <input
            style={{ margin: "0.5em 0" }}
            name="expense"
            type="number"
            placeholder="expense amount"
          />
          <br />
          <button style={{ margin: "0.5em 0" }} type="submit">
            add
          </button>
        </form>
      </div>
      <button style={{ marginTop: "5em" }} onClick={clearStore}>
        Clear
      </button>
    </div>
  );
}

const price = (p) =>
  p.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR"
  });

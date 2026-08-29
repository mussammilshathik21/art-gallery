import { Check, X } from "lucide-react";

import { ORDER_STEPS } from "../data/orders";

import "../css/OrderTracker.css";

/*
  Visual delivery pipeline: Placed -> Confirmed ->
  Shipped -> Out for Delivery -> Delivered.

  "Cancelled" is shown as its own terminal state,
  not as a step in the progress line.
*/

function OrderTracker({ status }) {

  if (status === "Cancelled") {
    return (
      <div className="tracker tracker-cancelled">
        <div className="tracker-cancelled-icon">
          <X size={16} />
        </div>
        <span>This order was cancelled.</span>
      </div>
    );
  }

  const currentIndex = ORDER_STEPS.indexOf(status);

  return (
    <div className="tracker">

      {ORDER_STEPS.map((step, index) => {

        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isLast = index === ORDER_STEPS.length - 1;

        return (
          <div className="tracker-step" key={step}>

            <div className="tracker-node-column">

              <div
                className={
                  "tracker-node" +
                  (isComplete ? " complete" : "") +
                  (isCurrent ? " current" : "")
                }
              >
                {isComplete ? (
                  <Check size={13} />
                ) : (
                  <span className="tracker-node-dot" />
                )}
              </div>

              {!isLast && (
                <div
                  className={
                    "tracker-line" +
                    (isComplete ? " complete" : "")
                  }
                />
              )}

            </div>

            <div className="tracker-label-column">

              <span
                className={
                  "tracker-label" +
                  (isCurrent ? " current" : "") +
                  (isComplete ? " complete" : "")
                }
              >
                {step}
              </span>

            </div>

          </div>
        );
      })}

    </div>
  );
}

export default OrderTracker;

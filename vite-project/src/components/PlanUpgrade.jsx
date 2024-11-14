// components/PlanUpgrade.jsx
import React from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("your-publishable-key");

const PlansContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f3f4f6;
  padding: 20px;
  border-radius: 12px;
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  font-size: 1.8em;
  margin-bottom: 20px;
`;

const PlanButton = styled.button`
  background-color: ${(props) => props.color || "#007bff"};
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px 0;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#0056b3"};
  }
`;

const CheckoutFormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const CheckoutForm = ({ plan }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      try {
        const response = await axios.post("/payment", {
          amount: plan === "Bronze" ? 1000 : plan === "Silver" ? 5000 : 10000,
          id,
        });

        if (response.data.success) {
          alert("Payment successful!");
        }
      } catch (error) {
        console.error("Payment failed", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay for {plan} Plan
      </button>
    </form>
  );
};

const PlanUpgrade = () => {
  const [selectedPlan, setSelectedPlan] = React.useState(null);

  return (
    <PlansContainer>
      <h2>Upgrade Your Plan</h2>
      {["Bronze", "Silver", "Gold"].map((plan, index) => (
        <PlanButton
          key={index}
          color={plan.toLowerCase()}
          onClick={() => setSelectedPlan(plan)}
        >
          {plan}
        </PlanButton>
      ))}

      {selectedPlan && (
        <Elements stripe={stripePromise}>
          <CheckoutForm plan={selectedPlan} />
        </Elements>
      )}
    </PlansContainer>
  );
};

export default PlanUpgrade;

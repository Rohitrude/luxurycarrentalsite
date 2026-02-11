import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { axios } = useAppContext();

  useEffect(() => {
    const run = async () => {
      const pending = JSON.parse(localStorage.getItem("pendingBooking"));

      if (!pending) {
        navigate("/my-bookings");
        return;
      }

      try {
        // ✅ Create booking after payment success
        const { data } = await axios.post("/api/bookings/create", pending.bookingData);

        if (data.success) {
          localStorage.removeItem("pendingBooking");

          // ✅ show success page for 3 seconds, then redirect
          setTimeout(() => {
            toast.success("Booking created ✅");
            navigate("/my-bookings");
          }, 3000);
        } else {
          toast.error(data.message || "Booking failed");
          navigate("/my-bookings");
        }
      } catch (err) {
        toast.error(err.message || "Something went wrong");
        navigate("/my-bookings");
      }
    };

    run();
  }, [axios, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful ✅</h1>
      <p className="text-gray-500 mt-2">Creating booking... Redirecting in 3 seconds</p>
    </div>
  );
}

import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";

const ForgotPassword = () => {
  const { forgotPassword, resetEmail } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (resetEmail) {
      setValue("email", resetEmail);
    }
  }, [resetEmail, setValue]);

  const onSubmit = ({ email }) => {
    forgotPassword(email)
      .then(() => {
        alert("Password reset email sent! Redirecting to Gmail...");
        setTimeout(() => {
          window.location.href = "https://mail.google.com";
        }, 2000);
      })
      .catch(() => {
        alert("Failed to send reset email. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <Helmet>
        <title>Forgot Password | TravelVerse</title>
      </Helmet>
      <div className="card w-full max-w-2xl p-2 md:p-[76px] shrink-0">
        <h2 className="text-4xl font-semibold text-black text-center">
          Reset your password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-black font-semibold">
                Email Address
              </span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
              })}
              placeholder="Enter your email address"
              className="input input-bordered w-full md:w-auto rounded-none border bg-secondary border-primary"
            />
            {errors.email && (
              <p className="text-red-600 text-sm font-semibold">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="form-control mt-6">
            <button className="btn border-none bg-primary text-light rounded-none hover:text-primary w-full">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

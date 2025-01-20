import React from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";

const Register = () => {
  const { createNewUser, setUser, updateUserProfile, signUpWithGoogle } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Firebase user creation
    createNewUser(data.email, data.password)
      .then((res) => {
        const user = res.user;
        setUser(user);
        updateUserProfile({ displayName: data.name, photoURL: data.photo })
          .then(() => {
            toast.success(
              `🎉 Registration successful! Welcome ${user.displayName}!`,
              {
                icon: "🚀",
              }
            );
            navigate(from);
          })
          .catch(() => {
            toast.error("Profile update failed. Please try again.");
          });
      })
      .catch((error) => {
        toast.error("🚨 Account creation failed: " + error.message);
      });
  };

  const handleGoogleSignUp = () => {
    signUpWithGoogle().then((res) => {
      navigate(from);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <Helmet>
        <title>Register | TravelVerse</title>
      </Helmet>
      <div className="card w-full max-w-2xl p-2 md:p-[76px] shrink-0">
        <h2 className="text-4xl font-semibold text-blackLight text-center">
          Register your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-blackLight font-semibold">
                Your Name
              </span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required." })}
              placeholder="Enter your name"
              className="input input-bordered w-full md:w-auto rounded-none border border-secondary"
            />
            {errors.name && (
              <p className="text-red-600 text-sm font-semibold">
                {errors.name.message}
              </p>
            )}
          </div>
          {/* Photo */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-blackLight font-semibold">
                Photo URL
              </span>
            </label>
            <input
              type="url"
              {...register("photo", { required: "Photo URL is required." })}
              placeholder="Drop your photo url"
              className="input input-bordered w-full md:w-auto rounded-none border border-secondary"
            />
            {errors.photo && (
              <p className="text-red-600 font-semibold text-sm">
                {errors.photo.message}
              </p>
            )}
          </div>
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl text-blackLight font-semibold">
                Email address
              </span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required." })}
              placeholder="Enter your email address"
              className="input input-bordered w-full md:w-auto rounded-none border border-secondary"
            />
            {errors.email && (
              <p className="text-red-600 font-semibold text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Password Create */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-xl text-blackLight font-semibold">
                Create Your Password
              </span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required.",
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    "Password must contain uppercase, lowercase, number, special character, and be at least 6 characters.",
                },
              })}
              placeholder="Enter your password"
              className="input input-bordered w-full md:w-auto rounded-none border border-secondary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-xs bg-transparent hover:bg-transparent text-blackLight shadow-none border-none absolute right-2 top-14"
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </button>
            {errors.password && (
              <p className="text-red-600 font-semibold text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Confirm Password */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-xl text-blackLight font-semibold">
                Confirm Your Password
              </span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm Password is required.",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match.",
              })}
              placeholder="Enter your password"
              className="input input-bordered w-full md:w-auto rounded-none border border-secondary"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 font-semibold text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          {/* Terms and Conditions */}
          <div className="form-control">
            <label className="label justify-start cursor-pointer">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must accept the terms.",
                })}
                className="checkbox checked:bg-navyText border-2 border-blackLight checkbox-primary outline-navyText"
              />
              <span className="label-text text-blackLight font-semibold ml-4">
                Accept our{" "}
                <a className="underline" href="">
                  terms
                </a>{" "}
                and{" "}
                <a className="underline" href="">
                  conditions
                </a>
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-600 font-semibold text-sm">
                {errors.terms.message}
              </p>
            )}
          </div>
          <div className="form-control mt-6">
            <button className="btn border-none bg-primary text-light rounded-none hover:text-blackLight w-full">
              Register
            </button>
          </div>
        </form>
        <div className="form-control mt-6">
          <h5 className="text-3xl font-semibold text-blackLight text-center mb-6">
            Or
          </h5>
          <button
            onClick={handleGoogleSignUp}
            className="btn border-none bg-primary text-light rounded-none hover:text-blackLight w-full"
          >
            <FaGoogle></FaGoogle>{" "}
            <span className="hidden md:flex">Sign Up With Google</span>
          </button>
        </div>
        <p className="font-semibold text-blackLight text-center">
          Already Have An Account ?{" "}
          <Link to={"/login"} className="text-[#F75B5F]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

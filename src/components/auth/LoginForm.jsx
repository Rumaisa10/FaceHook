import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Field from "../common/Field";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const API_URL = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`;
      console.log("🔹 API Request to:", API_URL);
      console.log("📩 Form Data:", formData);

      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          console.log("✅ Authenticated successfully!", response.data);

          setAuth({
            user,
            authToken: token.token,
            refreshToken: token.refreshToken,
          });

          navigate("/");
        }
      }
    } catch (error) {
      console.error("❌ Login Error:", error.response || error.message);

      setError("root.server", {
        type: "server",
        message:
          error.response?.data?.message || "Login failed. Please try again.",
      });
    }
  };

  return (
    <form
      className="border-b border-gray-300 pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(submitForm)}
    >
      {/* Email Field */}
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email is required" })}
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          type="email"
          name="email"
          id="email"
        />
      </Field>

      {/* Password Field */}
      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className={`auth-input ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          type="password"
          name="password"
          id="password"
        />
      </Field>

      {/* Error Message */}
      {errors?.root?.server && (
        <p className="text-red-500 mt-2">{errors.root.server.message}</p>
      )}

      {/* Submit Button */}
      <Field>
        <button
          className="auth-input bg-green-500 text-white font-bold transition-all hover:opacity-90"
          type="submit"
        >
          Login
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;

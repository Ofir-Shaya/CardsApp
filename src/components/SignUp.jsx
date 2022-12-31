import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Joi from "joi";
import { Navigate, useNavigate } from "react-router-dom";

import formikValidateUsingJoi from "../utils/formikValidateUsingJoi";
import InputFormGroup from "./common/InputFormGroup";
import PageHeader from "./common/PageHeader";
import { useAuth } from "../context/auth.context";

const SignUp = () => {
  const [error, setError] = useState("");

  const { createUser, user } = useAuth();
  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: formikValidateUsingJoi({
      name: Joi.string().min(2).max(255).required(),
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(6).max(1024).required(),
    }),
    async onSubmit(values) {
      try {
        await createUser({ ...values, biz: false });
        toast("Your account is ready! :D");
        navigate("/sign-in");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PageHeader
        title="Sign up with Real App"
        description="Open a new account, it's free"
      />

      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        {error && <div className="alert alert-danger">{error}</div>}

        <InputFormGroup
          error={form.touched.email && form.errors.email}
          label="Email Address"
          name="email"
          required
          {...form.getFieldProps("email")}
        />
        <InputFormGroup
          error={form.touched.password && form.errors.password}
          label="Password"
          name="new-password"
          required
          type="password"
          {...form.getFieldProps("password")}
        />
        <InputFormGroup
          error={form.touched.name && form.errors.name}
          label="Full Name"
          name="name"
          required
          {...form.getFieldProps("name")}
        />

        <div className="my-2">
          <button
            className="btn btn-primary"
            disabled={!form.isValid}
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUp;

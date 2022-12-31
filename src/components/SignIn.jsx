import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import Joi from "joi";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../context/auth.context";
import InputFormGroup from "./common/InputFormGroup";
import PageHeader from "./common/PageHeader";
import formikValidateUsingJoi from "../utils/formikValidateUsingJoi";

const SignIn = () => {
  const [error, setError] = useState("");

  const { login: loginUser, user } = useAuth();

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },

    validate: formikValidateUsingJoi({
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(6).max(1024).required(),
    }),

    async onSubmit(values) {
      try {
        await loginUser(values);
        navigate("/");
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
        title="Sign in to Real App"
        description="Enter your details below"
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
        <div className="my-2">
          <button
            className="btn btn-primary"
            disabled={!form.isValid}
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default SignIn;

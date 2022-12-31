import { useState } from "react";
import { useFormik } from "formik";
import Joi from "joi";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

import formikValidateUsingJoi from "../utils/formikValidateUsingJoi";
import PageHeader from "./common/PageHeader";
import InputFormGroup from "./common/InputFormGroup";
import { useAuth } from "../context/auth.context";

const SignUpBiz = () => {
  const [error, setError] = useState("");

  const { createUser, login, user } = useAuth();
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
        await createUser({ ...values, biz: true });
        await login({ email: values.email, password: values.password });
        toast("Your account is ready! 🤘🏾");

        navigate("/create-card");
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
        title="Sign Up as Business with Real App"
        description="Open a new account, it is free!"
      />

      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        {error && <div className="alert alert-danger">{error}</div>}

        <InputFormGroup
          type="email"
          label="Email"
          required
          {...form.getFieldProps("email")}
          error={form.touched.email && form.errors.email}
        />

        <InputFormGroup
          type="password"
          name="password"
          label="Password"
          required
          {...form.getFieldProps("password")}
          error={form.touched.password && form.errors.password}
        />

        <InputFormGroup
          type="text"
          label="Name"
          required
          {...form.getFieldProps("name")}
          error={form.touched.name && form.errors.name}
        />

        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUpBiz;

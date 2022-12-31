import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Joi from "joi";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../common/PageHeader";
import formikValidateUsingJoi from "../../utils/formikValidateUsingJoi";
import { updateCard } from "../../services/cardService";
import InputFormGroup from "../common/InputFormGroup";
import { useCard } from "../../hooks/UseCard";

const CardEdit = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const card = useCard(id);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    validate: formikValidateUsingJoi({
      bizName: Joi.string().min(2).max(255).required().label("Name"),
      bizDescription: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("Description"),
      bizAddress: Joi.string().min(2).max(400).required().label("Address"),
      bizPhone: Joi.string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/)
        .label("Phone"),
      bizImage: Joi.string().min(11).max(1024).label("Image").allow(""),
    }),
    async onSubmit(values) {
      try {
        const { bizImage, ...body } = values;

        if (bizImage) {
          body.bizImage = bizImage;
        }

        await updateCard(id, body);
        toast("Card Edited 👏🏾");
        navigate("/my-cards");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  useEffect(() => {
    if (!card) return;

    const { bizName, bizDescription, bizAddress, bizPhone, bizImage } = card;

    form.setValues({
      bizName,
      bizDescription,
      bizAddress,
      bizPhone,
      bizImage,
    });
  }, [card]);

  return (
    <>
      <PageHeader title="Edit Card" description="Edit Card" />

      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        {error && <div className="alert alert-danger">{error}</div>}

        <InputFormGroup
          type="text"
          label="Name"
          required
          {...form.getFieldProps("bizName")}
          error={form.touched.bizName && form.errors.bizName}
        />

        <InputFormGroup
          type="text"
          label="Description"
          required
          {...form.getFieldProps("bizDescription")}
          error={form.touched.bizDescription && form.errors.bizDescription}
        />

        <InputFormGroup
          type="text"
          label="Address"
          required
          {...form.getFieldProps("bizAddress")}
          error={form.touched.bizAddress && form.errors.bizAddress}
        />

        <InputFormGroup
          type="text"
          label="Phone"
          required
          {...form.getFieldProps("bizPhone")}
          error={form.touched.bizPhone && form.errors.bizPhone}
        />

        <InputFormGroup
          type="text"
          label="Image"
          {...form.getFieldProps("bizImage")}
          error={form.touched.bizImage && form.errors.bizImage}
        />

        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
          >
            Edit Card
          </button>
        </div>
      </form>
    </>
  );
};

export default CardEdit;

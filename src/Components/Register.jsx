import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signupUser } from "../Redux/Auth/AuthActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesubmit = (values) => {
    const payload = { fullName: values.fullName, email: values.email, password: values.password };
    dispatch(signupUser(payload)).then((res) => {
      console.log(res, "gett response ");
      if(res?.payload?.status === 201) {
        toast.success(res?.payload?.data?.message);
        setTimeout(() => {
          toast.dismiss();
          navigate("/login")
        }, 1500);
      }else{
        toast.error(res?.payload);
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 w-full">
      <div className="flex w-full overflow-hidden rounded-lg bg-white shadow-lg lg:w-4/5">
        {/* Left Section - Image & Info */}
        <div className="hidden w-1/2 bg-purple-700 p-8 text-white lg:flex flex-col justify-center items-center">
          <img
            src="https://s3-alpha-sig.figma.com/img/0b16/e7d0/e54f5ea69def92a8e3982fc5f2d8a09a?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ELXsZar86LV2sNTucxXlvREz~NqxyybYrN7AxyDD9aSR2FzndbqZuxjQ2E1NNWAHRtW~pW~330E9qF2Fwtr-8UI8eRy9DoimjVZw-6akL3UQQgF6RQN4csCG8rDsZqmIF~e34GEtNE0MoJmcI-LcJdIQa~ftJMZe9obiWLlMXG4S1ozqJhTfMqUT84u-dt56pdwr1ScQOAwq99qtwxduiWyW7W2UNJ8gjagTMZJYZeWkND938KL1zEipiARJPp8tYFmITDI9kK4Xnx1WWBLRI~W7n17jFUqg-ieBFx3gezum~jdk22EmTkdYkkQxEJv3CCvCyRKA11behfTmJDbrnA__"
            alt="Dashboard Preview"
            className="mb-4 rounded-md shadow-md"
          />
          <h2 className="text-xl font-bold text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>
          <p className="mt-2 text-center">
            Tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Right Section - Registration Form */}
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Welcome to Dashboard
          </h2>

          <Formik
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={Yup.object({
              fullName: Yup.string().min(3, "Must be at least 3 characters").required("Full Name is required"),
              email: Yup.string().email("Invalid email address").required("Email is required"),
              password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required"),
            })}
            onSubmit={(values) => handlesubmit(values)}
          >
            {({ isSubmitting }) => (
              <Form className="mt-6">
                {/* Full Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name<span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="fullName"
                    className="mt-1 w-full rounded-lg border px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring"
                    placeholder="Full name"
                  />
                  <ErrorMessage name="fullName" component="p" className="text-sm text-red-500" />
                </div>

                {/* Email Address */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address<span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="mt-1 w-full rounded-lg border px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring"
                    placeholder="Email Address"
                  />
                  <ErrorMessage name="email" component="p" className="text-sm text-red-500" />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Password<span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="mt-1 w-full rounded-lg border px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="p" className="text-sm text-red-500" />
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password<span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="mt-1 w-full rounded-lg border px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage name="confirmPassword" component="p" className="text-sm text-red-500" />
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-purple-700 px-4 py-2 text-white font-semibold hover:bg-purple-800 transition"
                >
                  Register
                </button>

                {/* Already have an account? */}
                <p className="mt-4 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to={"/login"} className="text-purple-700 font-medium">
                    Login
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;

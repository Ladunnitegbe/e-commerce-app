import { useState, useCallback } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Built-in validators, keyed by rule name, so screens just declare which
// rules apply to which field instead of writing validation logic themselves.
const validators = {
  required: (value) => (value && value.trim() !== "" ? "" : "This field is required"),
  email: (value) => (EMAIL_REGEX.test(value) ? "" : "Enter a valid email address"),
  minLength: (min) => (value) =>
    value && value.length >= min ? "" : `Must be at least ${min} characters`,
  password: (value) =>
    value && value.length >= 6 ? "" : "Password must be at least 6 characters",
};

/**
 * @param {Object} initialValues - e.g. { name: "", email: "", password: "" }
 * @param {Object} fieldRules - e.g. { name: ["required"], email: ["required", "email"], password: ["required", "password"] }
 */
export default function useForm(initialValues, fieldRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(
    (name, value) => {
      const rules = fieldRules[name] || [];
      for (const rule of rules) {
        if (typeof rule === "function") {
          const message = rule(value);
          if (message) return message;
        } else if (validators[rule]) {
          const message = validators[rule](value);
          if (message) return message;
        }
      }
      return "";
    },
    [fieldRules]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    },
    [validateField]
  );

  const validateAll = useCallback(() => {
    const newErrors = {};
    Object.keys(fieldRules).forEach((name) => {
      const message = validateField(name, values[name]);
      if (message) newErrors[name] = message;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fieldRules, validateField, values]);

  const handleSubmit = useCallback(
    (onValid) => async (e) => {
      e.preventDefault();
      if (!validateAll()) return;
      setIsSubmitting(true);
      try {
        await onValid(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateAll, values]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return { values, errors, isSubmitting, handleChange, handleSubmit, reset, validateAll };
}

const BaseJoi = require("joi");
const extention = require("../utils/sanitize-html");

const Joi = BaseJoi.extend(extention);

const inquirySchema = Joi.object({
  occupation: Joi.string().valid('学生', '会社員', '自営業', 'その他').required().messages({
    "any.required": "職業を選択してください",
    "any.only": "有効な職業を選択してください"
  }),
  name: Joi.string().required().messages({
    "string.base": "名前は文字列である必要があります",
    "any.required": "名前は必須です"
  }),
  email: Joi.string().escapeHTML().email().required().messages({
    "string.base": "メールアドレスは文字列である必要があります",
    "string.email": "有効なメールアドレスを入力してください",
    "any.required": "メールアドレスは必須です"
  }),
  phone: Joi.string().pattern(/^[0-9]{10,11}$/).required().messages({
    "string.pattern.base": "有効な電話番号を入力してください（11桁の数字）",
    "any.required": "電話番号は必須です"
  }),
  message: Joi.string().escapeHTML().allow(''),
}).required();

const inquiryValidate = (data) => {
  const { error } = inquirySchema.validate(data, { abortEarly: false });
  if (error) {
    const errors = {};
    error.details.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return errors;
  }
  return null;
};

module.exports = inquiryValidate;
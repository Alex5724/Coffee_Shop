export default class Validate {
  validate(input, value, label = 'This field') {
    const textValue = String(value ?? '');

    switch (input) {
      case 'productName': {
        const name = textValue.trim();

        if (!name) return 'Product name is required.';
        if (name.length < 5) {
          return 'Product name must have at least 5 characters.';
        }
        if (name.length > 30) {
          return 'Product name must have at most 30 characters.';
        }
        if (!/^[\p{L} ]+$/u.test(name)) {
          return 'Use letters and spaces only.';
        }

        return '';
      }

      case 'productDescription': {
        const description = textValue.trim();

        if (!description) return 'Description is required.';
        if (description.length < 20) {
          return 'Description must have at least 20 characters.';
        }
        if (description.length > 200) {
          return 'Description must have at most 200 characters.';
        }

        return '';
      }

      case 'productPrice': {
        if (!textValue.trim()) return 'Price is required.';

        if (!/^\d+(\.\d{1,2})?$/.test(textValue)) {
          return 'Enter a valid price with at most two decimal places.';
        }

        const price = Number(textValue);

        if (!Number.isFinite(price)) return 'Enter a valid price.';
        if (price < 1 || price > 999) {
          return 'Price must be between 1 and 999.';
        }

        return '';
      }

      case 'productQuantity': {
        if (!textValue.trim()) return 'Quantity is required.';

        const quantity = Number(textValue);

        if (!Number.isInteger(quantity)) {
          return 'Quantity must be a whole number.';
        }
        if (quantity < 0 || quantity > 999) {
          return 'Quantity must be between 0 and 999.';
        }

        return '';
      }

      case 'attributeNumber': {
        if (!textValue.trim()) return `${label} is required.`;

        const number = Number(textValue);

        if (!Number.isInteger(number)) {
          return `${label} must be a whole number.`;
        }
        if (number < 1 || number > 999) {
          return `${label} must be between 1 and 999.`;
        }

        return '';
      }

      case 'attributeText': {
        const text = textValue.trim();

        if (!text) return `${label} is required.`;
        if (text.length < 5) {
          return `${label} must have at least 5 characters.`;
        }
        if (text.length > 30) {
          return `${label} must have at most 30 characters.`;
        }
        if (!/^[\p{L} ]+$/u.test(text)) {
          return `${label} may contain letters and spaces only.`;
        }

        return '';
      }

      default:
        return '';
    }
  }
}

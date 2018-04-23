export default function percentageField() {
  return {
    restrict: 'A',
    require: 'ngModel',

    link: (scope, element, attr, ngModel) => {
      const percentageMaxValue = attr.percentageMaxValue || 100;
      const percentageMaxDecimals = attr.percentageMaxDecimals || 2;

      function into(input) {
        let inputTemp = input;
        if (inputTemp === '') {
          ngModel.$setValidity('valid', true);
          return '';
        }
        // check if number
        if (!inputTemp.match(/^\d+(\.\d+){0,1}%{0,1}$/gi)) {
          ngModel.$setValidity('valid', false);
          return '';
        }

        inputTemp = inputTemp.replace(/[^0-9.]/gi, '');
        inputTemp = parseFloat(inputTemp);
        const power = 10 ** percentageMaxDecimals;
        inputTemp = Math.round(inputTemp * power) / power;

        if (inputTemp > percentageMaxValue) inputTemp = percentageMaxValue;
        ngModel.$setValidity('valid', true);
        return inputTemp;
      }

      ngModel.$parsers.push(into);

      function out(input) {
        if (ngModel.$valid && input !== undefined && input >= 0) {
          return `${input}%`;
        }
        return '';
      }

      ngModel.$formatters.push(out);

      element.bind('blur', () => {
        element.val(out(ngModel.$modelValue));
      });
    }
  };
}

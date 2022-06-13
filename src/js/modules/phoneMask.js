const mask = (selector) => {

    let setCursorPosition = (pos, elem) => {
        elem.focus();
        
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    function createMask(event) {
        let matrix = '+880 (_) ____-______',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');

        if (def.length >= val.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (event.type === 'blur') {
            if (this.value.length == 5) {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    // fix, that prevent input before country code

    function protectCode (event) {   
        if (event.target.selectionStart <= 3) {
            setCursorPosition(this.value.length, this);
        }
		if (!event.target.value.match(/^\+880/)) {
			event.target.value = event.target.value.replace(/^.{4}/, "+880");
		}
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.setAttribute('pattern', '.{20}');
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
        input.addEventListener('click', protectCode);
        input.addEventListener('keypress', protectCode);
    });
};

export default mask;
frappe.ui.form.ControlQRCode = class ControlQRCode extends frappe.ui.form.ControlData {
	make_wrapper() {
		super.make_wrapper();

		let $input_wrapper = this.$wrapper.find(".control-input-wrapper");
		this.qrcode_area = $('<div class="qrcode-wrapper my-2"></div>');
		this.qrcode_area.appendTo($input_wrapper);
	}

	set_formatted_input(value) {
		this.$input.val(value || "");
		this.render_qrcode(value);
	}

	render_qrcode(value) {
		if (value) {
			let me = this;
			frappe
				.xcall("frappe.utils.print_format_generator.get_qr_code", { value: value })
				.then((src) => {
					if (me.qrcode_area && src) {
						me.qrcode_area.html(`
							<div class="qrcode-container">
								<img src="${src}" class="qrcode-image" style="max-width: 150px; max-height: 150px; display: block;" alt="QR Code" />
							</div>
						`);
					}
				});
		} else if (this.qrcode_area) {
			this.qrcode_area.empty();
	}
	}
};
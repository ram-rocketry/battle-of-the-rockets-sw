class Modal {
	constructor(options = {type: 'generic', status: 'default', message: 'No message provided', title: 'Untitled'}) {
		this.type = options.type
		//Generic modal, bottom left
		if (options.type === 'generic' || options.type === "center-noclose" || options.type === "center") {
			this.status = options.status
			this.message = options.message
			this.title = options.title
		} 
		//Big modal, center
		else if (options.type === 'config') {
			//TODO
		} else {
			//TODO
		}
		//TODO: add more options if needed

		//Generate IDs and domLayout
		this.id = "modal-" + (Math.random() * (2**53 - 1)).toString(16)
	}
	getDOMelement() {
		//console.log(this.type)
		if(this.type === 'generic' || this.type === "center") {
			return `
			<div class="modal-titlebar">
				<h3>${this.title}</h3>
				<a class="modal-titlebar-b" href=# onclick="removeModal('${this.id}')">&times;</a>
			</div>
			<hr>
			<p>${this.message}</p>`
		} else if(this.type === 'center-noclose') {
			return `<h3>${this.message}</h3>`
		}
	}
}

export {Modal}
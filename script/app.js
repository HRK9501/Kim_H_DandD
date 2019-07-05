(() => {
	// stub
	console.log('fired');

	// const is short for constant -> variables that shouldn't change
	const piecesBoard = document.querySelector('.puzzle-pieces'),
		puzzleBoard = document.querySelector('.puzzle-board'),
		puzzleSelectors = document.querySelectorAll('#buttonHolder img'),
		dropZones = document.querySelectorAll('.drop-zone');

	let draggablePieces = piecesBoard.querySelectorAll("img");

	// arrays are index and start at 0
	const imageNameArray = ["topleft", "topright", "bottomleft", "bottomright"];

	// debugger;

	function switchImage() {
		console.log(this);
		// grab the corresponding  background images (0, 1, 2 or 3)
		// and get it from the images folder (backGround.jpg as an example)
		let bgImage = `./images/backGround${this.dataset.puzzleref}.jpg`;

		// set the background image style on the dropzone container
		puzzleBoard.style.backgroundImage = `url(${bgImage})`;

		// debugger;

		// work on switching the righht-hab images so that they match  the buttons at the bottom
		draggablePieces.forEach((image, index) => {
			// log the image and the current index
			// console.log(image, index);

			// try to change each image source
			image.src = `images/${imageNameArray[index]}${this.dataset.puzzleref}.jpg`
			// debugger;
		});
	}

	puzzleSelectors.forEach(thumbnail => { thumbnail.addEventListener("click", switchImage); });

	// loop through the draggable images
	// this lets us drag stuff => not that hard
	draggablePieces.forEach(piece => {
		piece.addEventListener("dragstart", function(e) {
			console.log('draggin...');


			// dataTransfer object has two methods, a setter and getter
			// set data on the drag, and retreieve it on the drop
			e.dataTransfer.setData("text/plain", this.id);
		});
	})

	// this is dragover and drop functionality => this is for the drop zones
	dropZones.forEach(zone => {
		// allow user to drag over an element
		zone.addEventListener("dragover", function(e) {
			e.preventDefault();
			console.log('dragged something over me');

		});

		// allow a user to drop an element
		zone.addEventListener("drop", function(e) {
			e.preventDefault();
			console.log('you dropped sumpin on me');

			let draggedElement = e.dataTransfer.getData("text/plain");
			console.log(draggedElement);

			// console.log('dropping something on '+ e.target.className + 'current child count is '+ e.target.childNodes.length);

			// add image to the drop zone only if it does not already have children
			// and if the target we are dropping on is not another image.
			if (e.target.childElementCount == 0 && e.target.className != 'puzzle-image') {
				// add the image to the drop zone
				e.target.appendChild(document.querySelector(`#${draggedElement}`));
			}

		});
	})
})();
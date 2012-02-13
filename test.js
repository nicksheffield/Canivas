canivas = new Canivas(document.getElementById('stage'));

canivas

	.fullScreen()

	.triangle({
		x: 100, y: 100,
		width: 100,
		height: 90,
		color: 'red',
		centered: true,
		stroke:{ width: 8 }
	})

	.circle({
		x: 100, y: 215,
		width: 57,
		height: 57,
		color: 'rgba(255,255,255,1)',
		centered: true,
		stroke:{ width: 8 }
	})

	.square({
		x: 200, y: 200,
		width: 0,
		height: 90,
		centered: true,
		stroke:{ width: 4 }
	})

;

/*console.log(canivas.triangle({
	width: 100,
	height: 90,
	color: 'red',
	x: 100, y: 100,
	centered: true,
	stroke:{
		width: 8
	}
}, true));*/
<script>
	import { goto } from '$app/navigation';
	function move() {
		window.location.href="../3js"
	}
	function home() {
		window.location.href="/"
	}
	let logedin = false;
	let name = '';
	//handleLogOut
</script>

<nav class="navbar">
	<div class="navbar__logo">
		<i class="fab fa-accusoft"></i>
		<p style="padding-left: 10px; color:rgb(218, 164, 103); font-weight:bold;">Decorating Phone Case</p>
	</div>

	<ul class="navbar__icons">
	</ul>

	<a href="#" class="navbar__toogleBtn">
		<i class="fas fa-bars"></i>
	</a>
</nav>

<style>
	.third:hover{
		cursor: pointer;
	}
	.third {
		color: white;
	}
	.nav_button {
		padding: 8px 12px;
		display: flex;
		cursor: pointer;
		background: #263343;
		color: white;
		border-radius: 5px;
	}
	.nav_button:hover {
		background: #d49466;
	}
	a {
		text-decoration: none;
		color: white;
	}

	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: beige;
	}
	.navbar__logo {
		font-size: 24px;
		color: white;
	}

	.navbar__logo i {
		color: #d49466;
	}

	.navbar__menu {
		display: flex;
		list-style: none;
		padding-left: 0px;
	}

	.navbar__menu li {
		padding: 8px 12px;
	}

	.navbar__menu :hover {
		background: #d49466;
		border-radius: 4px;
	}

	.navbar__icons {
		list-style: none;
		color: white;
		display: flex;
		padding-left: 0px;
	}

	.navbar__toogleBtn {
		display: none;
		position: absolute;
		right: 32px;
		font-size: 24px;
		color: #d49466;
	}

	@media screen and (max-width: 768px) {
		.navbar {
			flex-direction: column;
			align-items: flex-start;
			padding: 8px 24px;
		}

		.navbar__menu {
			display: none;
			flex-direction: column;
			align-items: center;
			width: 100%;
		}

		.navbar__menu li {
			width: 100%;
			text-align: center;
		}

		.navbar__icons {
			display: none;
			justify-content: center;
			width: 100%;
		}

		.navbar__toogleBtn {
			display: block;
		}

		.navbar__menu.active,
		.navbar__icons.active {
			display: flex;
		}
	}
</style>

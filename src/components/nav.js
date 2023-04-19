

export default function NavBar(){
	return(<>
		<nav class="navbar is-fixed-bottom" role="navigation" aria-label="navigation">
			<div class="navbar-menu">
				<div class="navbar-start">
					<div class="navbar-item">
						<a class="navbar-link">
						Left
						</a>
					</div>
				</div>

				<div class="navbar-end">
					<div class="navbar-item">
						<a class="navbar-link">
						Right
						</a>
					</div>
				</div>
			</div>
	</nav>
	</>)
}
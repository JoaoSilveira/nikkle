<div class="navbar-wrapper">
    <div class="navbar">
        <a href="/daily">daily</a>
        <a href="/infinite">infinite</a>
    </div>
</div>

<style lang="scss">
    .navbar-wrapper {
        display: flex;
        justify-content: center;
        padding: 16px 36px;
        background-color: rgba(0, 0, 0, 0.65);
        box-shadow: 0 -1px 7px rgba(0, 0, 0, 0.4);
    }

    .navbar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 400px;
        flex: 1;

        & > a {
            font-weight: 600;
            text-transform: uppercase;
            color: rgb(235, 233, 228);
            letter-spacing: 0.2rem;

            &:hover {
                color: white;
                text-shadow: 1px 1px 5px lightslategray;
                text-decoration: underline;
            }
        }
    }
</style>

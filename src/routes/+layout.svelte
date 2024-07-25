<div class="content">
    <div class="navbar">
        <a href="/daily">daily</a>
        <a href="/infinite">infinite</a>
    </div>

    <slot />
</div>

<style lang="scss">
    @import "../style/global.scss";

    .content {
        display: flex;
        flex-direction: column;
    }

    .navbar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 300px;
        width: 100vw;
        align-self: center;
        padding-block: 32px;
        
        &>a {
            text-decoration: none;
            font-size: 2rem;
        }
    }
</style>

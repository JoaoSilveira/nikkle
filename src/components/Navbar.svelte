<script lang="ts">
    import { page } from "$app/stores";
</script>

<div class="navbar-wrapper">
    <div class="navbar">
        <a
            href="/"
            class:active={$page.route.id === null || $page.route.id === "/"}
            >daily</a>
        <a href="/infinite" class:active={$page.route.id === "/infinite"}
            >infinite</a>
    </div>
</div>

<style lang="scss">
    @import "../style/var";

    .navbar-wrapper {
        display: flex;
        justify-content: center;
        padding: 16px;
        background-color: rgba(0, 0, 0, 0.1);
        transition:
            background-color 0.15s,
            box-shadow 0.15s;

        &:hover {
            background-color: rgba(0, 0, 0, 0.75);
            box-shadow: 0 -1px 7px rgba(0, 0, 0, 0.4);
        }
    }

    .navbar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 400px;
        flex: 1;

        & > a {
            font-weight: 700;
            text-transform: uppercase;
            color: darken($color, 15%);
            letter-spacing: 0.2rem;

            &:hover {
                text-decoration: underline;
            }

            &.active,
            &:hover {
                color: $color;
                text-shadow: 0 0 5px darken($color, 35%);
            }
        }
    }
</style>

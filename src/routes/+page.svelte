<script lang="ts">
    import { nikkes } from "$lib/nikke";
    import { DailyRandom } from "$lib/random";

    const rand = new DailyRandom();
    const todaysNikke = rand.pick(nikkes);
</script>
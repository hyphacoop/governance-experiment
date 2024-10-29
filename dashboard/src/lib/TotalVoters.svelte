<script>
    import { votedCount } from "../stores";
  
    let totalVoters;
  
    // Subscribe to the `votedCount` store to get the total voter count
    $: votedCount.subscribe(value => {
      totalVoters = value;
    });
  </script>
  
  <div class="w-full flex flex-col component rounded-lg p-6 shadow-lg">
    <h2 class="font-semibold text-left">Participants</h2>
    <div class="flex flex-row justify-center items-center h-full">
        <p class="text-5xl font-bold my-4 text-left">
            <span>
                {totalVoters}
                </span>
                 / 12
        </p>
      </div>
</div>

<style>
    div p span {
        color: #000;
        text-decoration: underline;
        text-decoration-color: #9900FC;
        text-decoration-thickness: 5px;
    }
</style>
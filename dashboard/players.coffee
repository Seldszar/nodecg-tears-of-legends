$panel = $bundle.filter '.players'
$form = $panel.find 'form'
$switchPlayers = $panel.find '#switch-players'

players = nodecg.Replicant 'players'

players.on 'change', (oldVal, newVal) ->
    newVal = newVal or oldVal or []

    $.each newVal, (index, player) ->
        $.each player, (name, value) ->
            $form.find("[name='players[#{index}][#{name}]']").val value

$form.on 'submit', (event) ->
    event.preventDefault()

    $t = $ @
    data = $t.serializeObject()

    players.value = data.players

$switchPlayers.click ->
    tmp = players.value[0]

    players.value[0] = players.value[1]
    players.value[1] = tmp

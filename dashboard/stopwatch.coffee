$panel = $bundle.filter '.stopwatch'
$form = $panel.find 'form'
$formControls = $form.find ':input'
$stopwatchControls = $form.find '[data-stopwatch]'

stopwatch = nodecg.Replicant 'stopwatch'

stopwatch.on 'change', (oldVal, newVal) ->
    newVal = newVal or oldVal or {}

    $formControls.each ->
        $t = $ @
        name = $t.attr 'name'

        $t.val newVal[name]

$stopwatchControls.each ->
    $t = $ @
    command = $t.data 'stopwatch'

    $t.click (event) ->
        event.preventDefault()

        nodecg.sendMessage 'stopwatch', command

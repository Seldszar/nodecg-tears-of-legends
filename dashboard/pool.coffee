$panel = $bundle.filter '.pool'
$form = $panel.find 'form'
$formControls = $form.find ':input'

pool = nodecg.Replicant 'pool'

pool.on 'change', (oldVal, newVal) ->
    newVal = newVal or oldVal or {}

    $formControls.each ->
        $t = $ @
        name = $t.attr 'name'

        $t.val newVal[name]

$form.on 'submit', (event) ->
    event.preventDefault()

    $t = $ @
    data = $t.serializeObject()

    pool.value = data

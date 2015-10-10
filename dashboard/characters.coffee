$panel = $bundle.filter '.characters'
$form = $panel.find 'form'

characters = nodecg.Replicant 'characters'

characters.on 'change', (oldVal, newVal) ->
    newVal = newVal or oldVal or []

    $form.find('[name^="characters"]').each (index) ->
        $("option[value='#{newVal[index]}']", @).prop('selected', true) if newVal[index]

$form.on 'submit', (event) ->
    event.preventDefault()

    $t = $ @
    data = $t.serializeObject()

    characters.value = data.characters

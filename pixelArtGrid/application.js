$(function(){

    // setting the default valu of grid
    $('#grid-height').val(4);
    $('#grid-width').val(4);

    // generating grid 
    function makeGrid() {
        let height, width;
        height = $('#grid-height').val();
        width = $('#grid-width').val();
        let result = '';
        const box = '<span class="box" data-checked="false"></span>';
        const clearFix = '<div class="clear-fix"></div>';
        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                result += box;
            }
            result += clearFix;
        }
        $('.design-box').append(result);
        $('.design-box').css('width', (width * 20) + 'px');
    }

    // event listener for boxes inside the grid
    $('.design-box').on('click', '.box', function() {
        let color = hexToRGBA($('input[type=color]').val());
        console.log($(this).css('backgroundColor'), color);
        if ($(this).attr('data-checked') === 'true') {
            if ($(this).css('backgroundColor') !== color) {
                $(this).css('backgroundColor', color);
                $(this).attr('data-checked', 'true');
            } else {
                $(this).css('backgroundColor', '#FFF');
                $(this).attr('data-checked', 'false');
            }
        } else {
            $(this).css('backgroundColor', color);
            $(this).attr('data-checked', 'true');            
        }
    });

    // function to convert hex values to rgb values
    function hexToRGBA(hex) {
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            let c = hex.substring(1);
            let colorCode = '';
            if (c.length === 3) {
                colorCode += '0x' + c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
            } else {
                colorCode += '0x' + c;
            }
            console.log('rgba(' + ((colorCode >> 16)&255) + ',' + ((colorCode >> 8)&255) + ',' + (colorCode&255) + ',1)');
            return 'rgb(' + ((colorCode >> 16)&255) + ', ' + ((colorCode >> 8)&255) + ', ' + (colorCode&255) + ')';
        }
        throw new Error('Bad hex value');
    }

    // Submit button event handler
    $('#submit-btn').on('click', function() {
        if ($('#grid-width').val() > 50) {
            $('div.err').removeClass('hidden');
            return;
        } 
        
        if (!$('div.err').hasClass('hidden')) {
            $('div.err').addClass('hidden') ;
        }
        
        $('.box').remove();
        makeGrid();
    });

    // calling grid maker function to create the default grid
    makeGrid();
});
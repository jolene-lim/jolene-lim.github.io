$(function() {
    $('.pop-tags a').click(function() {
        var value = $(this).text();
        var input = $('#search-input');
        input.val(input.val() + value);
        return false;
    });
});
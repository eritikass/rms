"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var StandardForm = (function () {
    function StandardForm() {
    }
    StandardForm.prototype.ngOnInit = function () {
        // $.getScript('../../../assets/js/material-dashboard.js');
        $.getScript('../../../../assets/js/plugins/jquery.tagsinput.js');
        $.getScript('../../../../assets/js/plugins/bootstrap-datetimepicker.js');
        //initDatetimepickers();
        this.initForm();
    };
    StandardForm.prototype.initForm = function () {
        $(".img-check").click(function () {
            $(this).toggleClass("check");
        });
        var navListItems = $('div.setup-panel div a'), allWells = $('.setup-content'), allNextBtn = $('.nextBtn'), allPrevBtn = $('.prevBtn');
        allWells.hide();
        navListItems.click(function (e) {
            e.preventDefault();
            var $target = $($(this).attr('href')), $item = $(this);
            if (!$item.hasClass('disabled')) {
                navListItems.removeClass('btn-primary').addClass('btn-default');
                $item.addClass('btn-primary');
                allWells.hide();
                $target.show();
                $target.find('input:eq(0)').focus();
            }
        });
        allPrevBtn.click(function () {
            var curStep = $(this).closest(".setup-content"), curStepBtn = curStep.attr("id"), prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");
            prevStepWizard.removeAttr('disabled').trigger('click');
        });
        allNextBtn.click(function () {
            var curStep = $(this).closest(".setup-content"), curStepBtn = curStep.attr("id"), nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"), curInputs = curStep.find("input[type='text'],input[type='url']"), isValid = true;
            $(".form-group").removeClass("has-error");
            for (var i = 0; i < curInputs.length; i++) {
                // if (!<HTMLInputElement>curInputs[i].validity.valid){
                //     isValid = false;
                //     $(curInputs[i]).closest(".form-group").addClass("has-error");
                // }
            }
            if (isValid)
                nextStepWizard.removeAttr('disabled').trigger('click');
        });
        $('div.setup-panel div a.btn-primary').trigger('click');
    };
    return StandardForm;
}());
StandardForm = __decorate([
    core_1.Component({
        selector: 'standard-form-camp',
        moduleId: module.id,
        templateUrl: 'standardForm.component.html'
    })
], StandardForm);
exports.StandardForm = StandardForm;
//# sourceMappingURL=standardForm.component.js.map
var calculations = {
    /**
     * @description Расчитывается поверхность корпуса блока (4.46, <b>S</b><sub>к</sub>).
     *
     * @param {number} width - L<sub>1</sub>
     * @param {number} height - L<sub>3</sub>
     * @param {number} depth - L<sub>2</sub>
     *
     * @returns {number}
     */
    calcBlockSurface: function (width, height, depth) {
        return 2 * (width * depth + (width + depth) * height);
    },


    /**
     * @description Расчитывается условная поверхность нагретой зоны (4.39, <b>S</b><sub>з</sub>).
     *
     * @param {number} width - L<sub>1</sub>
     * @param {number} height - L<sub>3</sub>
     * @param {number} depth - L<sub>2</sub>
     * @param {number} fillFactor - K<sub>з</sub>
     *
     * @returns {number}
     */
    calcConventionalSurface: function (width, height, depth, fillFactor) {
        return 2 * (width * depth + (width + depth) * height * fillFactor);
    },


    /**
     * @description Расчитывается удельная мощность корпуса блока (4.45, <b>q</b><sub>к</sub>).
     *
     * @param power - <b>P</b><sub>з</sub>
     * @param blockSurface - <b>S</b><sub>к</sub> from (4.46)
     *
     * @returns {number}
     */
    calcBlockPowerDensity: function (power, blockSurface) {
        return power / blockSurface;
    },


    /**
     * @description Расчитывается удельная мощность нагретой зоны (4.38, <b>q</b><sub>з</sub>).
     *
     * @param {number} surfacePower - <b>P</b><sub>з</sub>
     * @param {number} conventionalSurface - <b>S</b><sub>к</sub> from (4.39)
     *
     * @returns {number}
     */
    calcSurfacePowerDensity: function (surfacePower, conventionalSurface) {
        return surfacePower / conventionalSurface;
    },


    /**
     * @description Находится коэффициент V<sub>1</sub> в зависимости от удельной мощности корпуса блока (из 4.45, <b>q</b><sub>к</sub>).
     */
    getBlockOverheat: function () {
    },


    /**
     * @description Находится коэффициент V<sub>2</sub> в зависимости от удельной мощности нагретой зоны (из 4.38, <b>q</b><sub>з</sub>).
     */
    getSurfaceOverheat: function () {
    },


    /**
     * @description Находится коэффициент <b>К</b><sub>Н1</sub> в зависимости от давления среды вне корпуса блока H1.
     */
    getExternalPressureRatio: function () {
    },


    /**
     * @description Находится коэффициент <b>К</b><sub>Н2</sub> в зависимости от давления среды внутри корпуса блока H2.
     */
    getInternalPressureRatio: function () {
    },


    /**
     * @description Определяется перегрев корпуса блока (4.58, <b>V</b><sub>k</sub>).
     *
     * @returns {number}
     */
    calcBlockOverheat: function () {
        return getExternalPressureRatio() * getBlockOverheat();
    },


    /**
     * @description Определяется перегрев нагретой зоны (4.59, <b>V</b><sub>з</sub>).
     *
     * @returns {number}
     */
    calcSurfaceOverheat: function () {
        return calcBlockOverheat() + (getSurfaceOverheat() - getExternalPressureRatio()) * getInternalPressureRatio();
    },


    /**
     * @description Определяется средний перегрев воздуха в блоке (4.60, <b>V</b><sub>в</sub>).
     *
     * @return {number}
     */
    calcAverageBlockOverheat: function () {
        return 0.5 * (calcBlockOverheat() + calcSurfaceOverheat());
    },


    /**
     * @description Определяется удельная мощность элемента (4.61, <b>q</b><sub>эл</sub>).
     *
     * @param {number} power - Мощность, рассеиваемая элементом (узлом), температуру которого требуется определить.
     * @param {number} square - Площадь поверхности элемента (вместе с радиатором), омываемая воздухом.
     *
     * @return {number}
     */
    calcElementPowerDensity: function (power, square) {
        return power / square;
    },


    /**
     * @description Расчитывается перегрев поверхности элемента (4.57, <b>V</b><sub>эл</sub>).
     *
     * @param {number} elemPower
     * @param {number} elemSquare
     *
     * @returns {number}
     */
    calcElementSurfaceOverheat: function (elemPower, elemSquare) {
        return calcSurfaceOverheat() * (0.75 + 0.25 * (calcElementPowerDensity(elemPower, elemSquare) / getSurfaceOverheat()));
    },


    /**
     * @description Расчитывается перегрев окружающий элемент среды (4.62, <b>V</b><sub>эс</sub>).
     * @param elemPower
     * @param elemSquare
     * @param surfacePower
     * @param conventionalSurface
     * @return {number}
     */
    calcElementEnvironmentOverheat: function (elemPower, elemSquare, surfacePower, conventionalSurface) {
        return calcAverageBlockOverheat() * (0.75 + 0.25 * (calcElementPowerDensity(elemPower, elemSquare) / calcSurfacePowerDensity(surfacePower, conventionalSurface)));
    },


    /**
     * @description Определяется температура корпуса блока (4.63, <b>T</b><sub>к</sub>).
     */
    calcBlockTemperature: function (envTemp) {
        return calcBlockOverheat() + envTemp;
    },


    /**
     * @description Определяется температура нагретой зоны (4.64, <b>T</b><sub>з</sub>).
     *
     * @return {*}
     * @param envTemp
     */
    calcHeatedZoneTemperature: function (envTemp) {
        return calcSurfaceOverheat() + envTemp;
    },


    /**
     * @description Находится температура поверхности элемента (4.65, <b>T</b><sub>эл</sub>).
     */
    calcElementSurfaceTemperature: function (envTemp) {
        return calcElementSurfaceOverheat() + envTemp;
    },


    /**
     * @description Находится средняя температура воздуха в блоке (4.66, <b>T</b><sub>в</sub>).
     */
    calcAverageBlockTemperature: function (envTemp) {
        return calcAverageBlockOverheat() + envTemp;
    },


    /**
     * @description Находится температура окружающей элемент среды (4.67, <b>T</b><sub>эс</sub>).
     * @param envTemp
     * @param elemPower
     * @param elemSquare
     * @param surfacePower
     * @param conventionalSurface
     */
    calcElementEnvironmentTemperature: function (envTemp, elemPower, elemSquare, surfacePower, conventionalSurface) {
        return calcElementEnvironmentOverheat(elemPower, elemSquare, surfacePower, conventionalSurface) + envTemp;
    }

};

app.controller("corpsesCtrl", function ($scope) {

    $scope.corpses = [
        {
            title: "Герметичный корпус",
            imgSrc: "assets/img/corpse.jpg",
            desc: "Герметичный корпус без внутреннего перемешивания"
        },

        {
            title: "Герметичный корпус",
            imgSrc: "assets/img/corpse.jpg",
            desc: "Герметичный корпус с внутренним перемешиванием"
        },

        {
            title: "Герметичный корпус",
            imgSrc: "assets/img/corpse.jpg",
            desc: "Герметичный корпус с наружным обдувом"
        },

        {
            title: "Герметичный корпус",
            imgSrc: "assets/img/corpse.jpg",
            desc: "Герметичный оребренный корпус"
        },

        {
            title: "Перфорированный корпус",
            imgSrc: "assets/img/corpse.jpg",
            desc: "Перфорированный корпус"
        }
    ];

    $scope.chooseCorpse = function () {
      console.log("clicked!");
    };
});
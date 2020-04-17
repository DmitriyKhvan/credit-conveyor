import {
    Loading,
    QSpinnerGears,
    QSpinnerDots,
    QSpinnerHourglass,
    QSpinnerBall,
    QSpinnerIos
} from 'quasar'

const LoadingService = {

    showLoadingDefault() {
        Loading.show({
            backgroundColor: 'primary',
        });
    },
    showLoadingGears() {
        Loading.show({
            spinner: QSpinnerGears
        });
    },
    showLoadingDots() {
        Loading.show({
            spinner: QSpinnerDots
        });
    },
    showLoadingHourGlass() {
        Loading.show({
            backgroundColor: 'primary',
            spinner: QSpinnerHourglass,
            message: 'Loading...',
        });
    },
    showLoadingBall() {
        Loading.show({
            spinner: QSpinnerBall
        });
    },
    showLoadingIos() {
        Loading.show({
            spinner: QSpinnerIos
        });
    },
    hideLoading() {
        Loading.hide();
    }
};

export default LoadingService;
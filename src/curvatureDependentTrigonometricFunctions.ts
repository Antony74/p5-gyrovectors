export const tan = (curvature: number) => (x: number) => {
    if (curvature < 0) {
        return (
            (1 / Math.sqrt(-curvature)) * Math.tanh(Math.sqrt(-curvature) * x)
        );
    } else if (curvature === 0) {
        return x;
    } else {
        return (1 / Math.sqrt(curvature)) * Math.tan(Math.sqrt(curvature) * x);
    }
};

export const atan = (curvature: number) => (x: number) => {
    if (curvature < 0) {
        return (
            (1 / Math.sqrt(-curvature)) * Math.atanh(Math.sqrt(-curvature) * x)
        );
    } else if (curvature === 0) {
        return x;
    } else {
        return (1 / Math.sqrt(curvature)) * Math.atan(Math.sqrt(curvature) * x);
    }
};

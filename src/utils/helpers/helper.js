function isNotEmpty(x) {
        return (
                !(
                        typeof x === 'undefined' ||
                        x === null ||
                        x === 'null' ||
                        x === 'undefined' ||
                        x === false ||
                        x === '0.00' ||
                        x.length === 0 ||
                        (x === 'object' && Object.key(x).length === 0) ||
                        x === '' ||
                        (x && // 👈 null and undefined check
                                Object.keys(x).length === 0 &&
                                Object.getPrototypeOf(x) === Object.prototype)
                )
        )
}

const HELPER = {
        isNotEmpty,
};

export default HELPER
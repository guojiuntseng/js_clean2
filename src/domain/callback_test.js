
function A () {
    let name = 'guojiun';
    console.log(name)
    B((newName) => name += newName)
    console.log(name)
}

function B (callback) {
    let newName = 'tseng'
    console.log('....')
    callback(newName)
    console.log('....')
}

A()
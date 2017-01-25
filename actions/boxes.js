const TOGGLE_BOX = 'TOGGLE_BOX'
export function toggleBox (box) {
  return {
    type: TOGGLE_BOX,
    box
  }
}

export default function reducer (state = {
    visible: ''
  }, action) {
  switch (action.type) {
    case TOGGLE_BOX:
      return Object.assign({}, state, {
        visible: state.visible === action.box ? null : action.box
      })
    default:
      return state
    }
}

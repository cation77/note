---
title: vue 流程
---

## createApp

createApp
ensureRenderer
createRenderer
baseCreateRenderer
createAppAPI
mount
createVNode
createBaseVNode
render
patch

## patch

### processElement

processElement
mountElement
patchElement

- mountElement
  hostSetElementText
  mountChildren
  hostInsert

- patchElement
  patchBlockChildren
  patchChildren
  patchProps

### processComponent

processComponent
mountComponent
updateComponent

- mountComponent
  createComponentInstance
  setupComponent
    setupStatefulComponent
    handleSetupResult
    finishComponentSetup
  setupRenderEffect
    ReactiveEffect
    queueJob
    instance.update
    componentUpdateFn
    renderComponentRoot
    patch

- updateComponent
  shouldUpdateComponent
  - updateComponentPreRender
  - instance.update
    componentUpdateFn
    updateComponentPreRender
    renderComponentRoot
    patch

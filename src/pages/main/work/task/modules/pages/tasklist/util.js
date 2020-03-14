
export const searchIndex = (arr,scene) => {
  const scene1 = Object.assign({},scene)
  
  for(let i = 0; i < scene1.children.length; i++){
      scene1.children[i].children = arr.filter(e => e.status_u === scene1.children[i].id)      
  }

  return scene1;

}
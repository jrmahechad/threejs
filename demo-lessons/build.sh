#!/bin/bash
start="Let's begin!"
echo $start
## array of lessons
declare -a arr=("04-webpack"
                "05-transforms-objects"
                "06-animations"
                "07-cameras"
                "08-fullscreen-and-resizing"
                "09-geometries"
                "10-debug-ui"
                "11-textures"
                "12-materials"
                "13-3d-text"
                "14-lights"
                "15-shadows"
                "16-haunted-house"
                "17-particles"
                "18-galaxy-generator"
                "19-raycaster"
                "20-physics"
                "21-imported-models"
                "22-custom-model-with-blender"
                "23-realistic-render"
                "24-shaders"
                "25-shader-patterns"
                "26-raging-sea"
                "27-animated-galaxy"
                "28-modified-materials"
                "29-post-processing"
                "30-performance-tips"
                "31-intro-and-loading-progress"
                "32-mixing-html-and-webgl"
                "35-importing-and-optimizing-the-scene"
                "36-adding-details-to-the-scene"
                )

rm -r dist; mkdir dist

elements=''

buildAll=''
read -p 'Builda all lessons: (Y/other key for no)' buildAll

## now loop through the above array
for i in "${arr[@]}"
do
    path="../lessons/$i"
    echo "----"
    echo "START for: $i"
    cd $path
    if [ "$buildAll" == 'Y' ]
        then
        echo "BUILDING: "$path
        npm run build
        echo "BUILD $i: DONE"
    fi
    cp -a dist/. ../../demo-lessons/dist/$i
    elements="${elements}<li><a href="/$i">$i</a></li>"
    cd -
    echo "END for: $i"
    echo ""
done

echo ""
echo "GENERATING INDEX FILE"
cp index.html dist/
cd dist
sed -i "" "s#ELEMENTS#$elements#g" index.html
echo "DONE"
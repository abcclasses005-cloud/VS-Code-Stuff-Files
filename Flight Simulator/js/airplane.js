import * as THREE from "three";

export function createAirplane() {

    const plane = new THREE.Group();

    // -------------------
    // Fuselage
    // -------------------

    const fuselage = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2,1.0,10,24),
        new THREE.MeshPhongMaterial({
            color:0xffffff
        })
    );

    fuselage.rotation.z=Math.PI/2;
    plane.add(fuselage);

    // Nose

    const nose=new THREE.Mesh(
        new THREE.SphereGeometry(1.1,24,24),
        new THREE.MeshPhongMaterial({
            color:0xffffff
        })
    );

    nose.position.x=5;
    plane.add(nose);

    // Cockpit

    const cockpit=new THREE.Mesh(

        new THREE.SphereGeometry(.9,24,24),

        new THREE.MeshPhongMaterial({

            color:0x4da6ff,

            transparent:true,

            opacity:.8

        })

    );

    cockpit.scale.set(1.2,.8,1);

    cockpit.position.set(1,.7,0);

    plane.add(cockpit);

    // Main Wings

    const wing=new THREE.Mesh(

        new THREE.BoxGeometry(1,0.25,16),

        new THREE.MeshPhongMaterial({

            color:0xffffff

        })

    );

    plane.add(wing);

    // Tail Wing

    const tailWing=new THREE.Mesh(

        new THREE.BoxGeometry(.7,.2,5),

        new THREE.MeshPhongMaterial({

            color:0xffffff

        })

    );

    tailWing.position.x=-4;

    plane.add(tailWing);

    // Vertical Stabilizer

    const fin=new THREE.Mesh(

        new THREE.BoxGeometry(.2,2,2),

        new THREE.MeshPhongMaterial({

            color:0xffffff

        })

    );

    fin.position.set(-4,1,0);

    plane.add(fin);

    // Landing Gear

    function wheel(x,y,z){

        const gear=new THREE.Group();

        const strut=new THREE.Mesh(

            new THREE.CylinderGeometry(.05,.05,.8),

            new THREE.MeshPhongMaterial({

                color:0x555555

            })

        );

        strut.position.y=-.4;

        gear.add(strut);

        const tyre=new THREE.Mesh(

            new THREE.TorusGeometry(.25,.09,12,20),

            new THREE.MeshPhongMaterial({

                color:0x111111

            })

        );

        tyre.rotation.x=Math.PI/2;

        tyre.position.y=-.8;

        gear.add(tyre);

        gear.position.set(x,y,z);

        plane.add(gear);

    }

    wheel(1,-.6,1.3);
    wheel(1,-.6,-1.3);
    wheel(4,-.6,0);

    // Propeller

    const propeller=new THREE.Group();

    const blade1=new THREE.Mesh(

        new THREE.BoxGeometry(.12,4,.15),

        new THREE.MeshPhongMaterial({

            color:0x222222

        })

    );

    propeller.add(blade1);

    const blade2=blade1.clone();

    blade2.rotation.z=Math.PI/2;

    propeller.add(blade2);

    propeller.position.x=5.6;

    plane.add(propeller);

    plane.userData.propeller=propeller;

    plane.castShadow=true;

    plane.receiveShadow=true;

    return plane;

}
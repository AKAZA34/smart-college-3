import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Activity, ShieldAlert, Cpu, Orbit, Eye, RefreshCw } from 'lucide-react';
import { useAppState } from '../../data/store';

interface QuantumNodeData {
  id: string;
  name: string;
  label: string;
  value: string;
  color: string;
  hexColor: number;
  radius: number;
  speed: number;
  angle: number;
  iconName: string;
  moduleRoute: string;
  description: string;
}

interface Props {
  onNavigate: (route: string) => void;
}

export const QuantumCampusState: React.FC<Props> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentStudent, attendance, assignments, marks } = useAppState();
  const [hoveredNode, setHoveredNode] = useState<QuantumNodeData | null>(null);
  const [quantumStateMode, setQuantumStateMode] = useState<'Coherent' | 'Excited' | 'Superposed'>('Coherent');
  const [isRotating, setIsRotating] = useState(true);

  // Compute live node metrics
  const nodesRef = useRef<QuantumNodeData[]>([
    {
      id: 'attendance',
      name: 'Attendance',
      label: 'Attendance Matrix',
      value: `${currentStudent.currentAttendance}%`,
      color: '#06b6d4',
      hexColor: 0x06b6d4,
      radius: 4.8,
      speed: 0.012,
      angle: 0,
      iconName: 'Activity',
      moduleRoute: 'attendance',
      description: 'Course attendance trajectory & session thresholds'
    },
    {
      id: 'marks',
      name: 'Marks',
      label: 'Internal Marks',
      value: '84.2 Avg',
      color: '#10b981',
      hexColor: 0x10b981,
      radius: 6.2,
      speed: 0.009,
      angle: (Math.PI * 2) / 7,
      iconName: 'BarChart3',
      moduleRoute: 'marks',
      description: 'Continuous assessment & internal grade breakdown'
    },
    {
      id: 'cgpa',
      name: 'CGPA',
      label: 'Predicted CGPA',
      value: `${currentStudent.cgpa.toFixed(2)}`,
      color: '#8b5cf6',
      hexColor: 0x8b5cf6,
      radius: 7.5,
      speed: 0.007,
      angle: ((Math.PI * 2) / 7) * 2,
      iconName: 'Sparkles',
      moduleRoute: 'cgpa-predictor',
      description: 'Predictive GPA simulator and subject sensitivity'
    },
    {
      id: 'study',
      name: 'Study',
      label: 'AI Study Rhythm',
      value: '2.5h / day',
      color: '#f59e0b',
      hexColor: 0xf59e0b,
      radius: 8.8,
      speed: 0.006,
      angle: ((Math.PI * 2) / 7) * 3,
      iconName: 'BookOpen',
      moduleRoute: 'study-planner',
      description: 'Adaptive study calendar & spaced repetition'
    },
    {
      id: 'assignments',
      name: 'Assignments',
      label: 'Pending Tasks',
      value: `${assignments.filter(a => a.status !== 'Completed').length} Pending`,
      color: '#f43f5e',
      hexColor: 0xf43f5e,
      radius: 5.6,
      speed: 0.011,
      angle: ((Math.PI * 2) / 7) * 4,
      iconName: 'CheckSquare',
      moduleRoute: 'assignments',
      description: 'Priority-ranked submissions and lab exercises'
    },
    {
      id: 'campus',
      name: 'Campus',
      label: 'Campus Matrix',
      value: '4 Labs Active',
      color: '#3b82f6',
      hexColor: 0x3b82f6,
      radius: 9.8,
      speed: 0.005,
      angle: ((Math.PI * 2) / 7) * 5,
      iconName: 'MapPin',
      moduleRoute: 'campus-map',
      description: 'Real-time lab availability, facilities & venue routes'
    },
    {
      id: 'ai',
      name: 'AI Risk',
      label: 'Academic Risk Engine',
      value: `${currentStudent.academicRisk}`,
      color: '#14b8a6',
      hexColor: 0x14b8a6,
      radius: 4.0,
      speed: 0.015,
      angle: ((Math.PI * 2) / 7) * 6,
      iconName: 'Cpu',
      moduleRoute: 'academic-risk',
      description: 'Multi-factor machine learning risk assessment'
    }
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 460;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 14, 18);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 3, 50);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    // 3. Central Student Quantum Core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Central Sphere
    const coreGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Inner wireframe shell
    const shellGeo = new THREE.IcosahedronGeometry(1.45, 2);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    coreGroup.add(shellMesh);

    // Outer Halo
    const haloGeo = new THREE.RingGeometry(1.8, 2.2, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2;
    coreGroup.add(haloMesh);

    // 4. Orbital Rings & Satellite Nodes
    const satelliteMeshes: { mesh: THREE.Mesh; data: QuantumNodeData; halo: THREE.Mesh }[] = [];
    const lineBeams: THREE.Line[] = [];

    nodesRef.current.forEach((node) => {
      // Orbital Ring
      const ringGeo = new THREE.RingGeometry(node.radius - 0.02, node.radius + 0.02, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: node.hexColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.18,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      scene.add(ringMesh);

      // Satellite Sphere
      const satGeo = new THREE.SphereGeometry(0.55, 24, 24);
      const satMat = new THREE.MeshStandardMaterial({
        color: node.hexColor,
        emissive: node.hexColor,
        emissiveIntensity: 0.5,
        roughness: 0.3,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      (satMesh as any).nodeData = node;

      // Outer satellite glow ring
      const satGlowGeo = new THREE.RingGeometry(0.7, 0.85, 32);
      const satGlowMat = new THREE.MeshBasicMaterial({
        color: node.hexColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const satGlowMesh = new THREE.Mesh(satGlowGeo, satGlowMat);
      satGlowMesh.rotation.x = Math.PI / 2;
      satMesh.add(satGlowMesh);

      scene.add(satMesh);
      satelliteMeshes.push({ mesh: satMesh, data: node, halo: satGlowMesh });

      // Connecting Beam to Center
      const lineMat = new THREE.LineBasicMaterial({
        color: node.hexColor,
        transparent: true,
        opacity: 0.35,
      });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(node.radius, 0, 0),
      ]);
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
      lineBeams.push(line);
    });

    // 5. Ambient Quantum Particles Field
    const particleCount = 200;
    const particlesGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const pRadius = 2 + Math.random() * 12;
      const pAngle = Math.random() * Math.PI * 2;
      const pY = (Math.random() - 0.5) * 4;

      particlePositions[i * 3] = Math.cos(pAngle) * pRadius;
      particlePositions[i * 3 + 1] = pY;
      particlePositions[i * 3 + 2] = Math.sin(pAngle) * pRadius;

      // Color variation (cyan, violet, emerald)
      const colorMix = Math.random();
      if (colorMix < 0.4) {
        particleColors[i * 3] = 0.02;
        particleColors[i * 3 + 1] = 0.71;
        particleColors[i * 3 + 2] = 0.83; // Cyan
      } else if (colorMix < 0.7) {
        particleColors[i * 3] = 0.54;
        particleColors[i * 3 + 1] = 0.36;
        particleColors[i * 3 + 2] = 0.96; // Violet
      } else {
        particleColors[i * 3] = 0.06;
        particleColors[i * 3 + 1] = 0.72;
        particleColors[i * 3 + 2] = 0.5; // Emerald
      }
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    });
    const particlesField = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesField);

    // 6. Raycasting for Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const targets = satelliteMeshes.map((s) => s.mesh);
      const intersects = raycaster.intersectObjects(targets);

      if (intersects.length > 0) {
        const hit = (intersects[0].object as any).nodeData as QuantumNodeData;
        setHoveredNode(hit);
        container.style.cursor = 'pointer';
      } else {
        setHoveredNode(null);
        container.style.cursor = 'default';
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const targets = satelliteMeshes.map((s) => s.mesh);
      const intersects = raycaster.intersectObjects(targets);

      if (intersects.length > 0) {
        const hit = (intersects[0].object as any).nodeData as QuantumNodeData;
        if (hit?.moduleRoute) {
          onNavigate(hit.moduleRoute);
        }
      }
    };

    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('click', handleClick);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate central core
      coreGroup.rotation.y = elapsed * 0.4;
      shellMesh.rotation.x = elapsed * 0.25;
      shellMesh.rotation.z = elapsed * 0.15;

      // Pulse halo
      const scale = 1 + Math.sin(elapsed * 2) * 0.06;
      haloMesh.scale.set(scale, scale, scale);

      // Rotate background particles
      particlesField.rotation.y = elapsed * 0.05;

      // Orbit satellites
      satelliteMeshes.forEach(({ mesh, data, halo }, index) => {
        const speedMultiplier = isRotating ? 1 : 0.1;
        data.angle += data.speed * speedMultiplier;

        const x = Math.cos(data.angle) * data.radius;
        const z = Math.sin(data.angle) * data.radius;
        const y = Math.sin(elapsed * 1.5 + index) * 0.35;

        mesh.position.set(x, y, z);
        halo.rotation.z = elapsed * 1.5;

        // Update beam line positions
        const beam = lineBeams[index];
        const positions = beam.geometry.attributes.position as THREE.BufferAttribute;
        positions.setXYZ(0, 0, 0, 0);
        positions.setXYZ(1, x, y, z);
        positions.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isRotating, onNavigate]);

  return (
    <div className="relative w-full rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-5 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300">
      {/* Background glow gradient */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
            <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              AI Campus State
            </h3>
            <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Orbital Real-time
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Your academic ecosystem in real time. Click any orbital node to open the module.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg bg-slate-950/80 p-1 border border-slate-800 text-xs">
            {(['Coherent', 'Excited', 'Superposed'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setQuantumStateMode(mode)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  quantumStateMode === mode
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsRotating(!isRotating)}
            title={isRotating ? 'Pause Orbit Rotation' : 'Resume Orbit Rotation'}
            className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-[380px] sm:h-[420px] rounded-xl relative overflow-hidden bg-gradient-to-b from-slate-950/90 to-slate-900/90 border border-slate-800/80 flex items-center justify-center"
      />

      {/* Active Node Live HUD Overlay */}
      {hoveredNode && (
        <div className="absolute top-20 right-8 z-20 max-w-xs rounded-xl bg-slate-950/90 p-4 border border-cyan-500/40 shadow-xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: hoveredNode.color, boxShadow: `0 0 10px ${hoveredNode.color}` }}
              />
              <span className="font-bold text-sm text-white">{hoveredNode.name}</span>
            </div>
            <span
              className="text-xs font-mono font-bold px-2 py-0.5 rounded-md"
              style={{ backgroundColor: `${hoveredNode.color}20`, color: hoveredNode.color }}
            >
              {hoveredNode.value}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            {hoveredNode.description}
          </p>
          <button
            onClick={() => onNavigate(hoveredNode.moduleRoute)}
            className="w-full text-center text-xs font-medium py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition-all flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            Launch {hoveredNode.name} Module
          </button>
        </div>
      )}

      {/* Bottom quick navigation badges */}
      <div className="mt-3 grid grid-cols-3 sm:grid-cols-7 gap-2">
        {nodesRef.current.map((node) => (
          <button
            key={node.id}
            onClick={() => onNavigate(node.moduleRoute)}
            className="group flex flex-col items-center p-2 rounded-lg bg-slate-950/50 hover:bg-slate-900 border border-slate-800/70 hover:border-cyan-500/40 transition-all"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: node.color }}
              />
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white">
                {node.name}
              </span>
            </div>
            <span
              className="text-[11px] font-mono font-medium"
              style={{ color: node.color }}
            >
              {node.value}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

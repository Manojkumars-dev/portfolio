'use client'

import AnimatedShaderBackground from '@/components/ui/animated-shader-background'

const ShaderBackgroundDemo = () => {
  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <AnimatedShaderBackground />
      
      {/* Optional content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center z-20">
          <h1 className="text-6xl font-bold text-white mb-4">Aurora Effect</h1>
          <p className="text-xl text-gray-300">Animated shader background with Three.js</p>
        </div>
      </div>
    </div>
  )
}

export { ShaderBackgroundDemo }

import React, { useRef, useState, useEffect } from 'react';
import { Upload, Camera, X, RefreshCw } from 'lucide-react';

interface PhotoUploaderProps {
  portraitImage: string | null;
  onSelectImage: (dataUrl: string | null) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ portraitImage, onSelectImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onSelectImage(result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Start webcam
  const startCamera = async () => {
    setCameraError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      cameraInputRef.current?.click();
      return;
    }

    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 720 }, height: { ideal: 960 }, facingMode: 'user' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      setIsCameraActive(false);
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
      } else {
        setCameraError('Izin kamera tidak aktif.');
      }
    }
  };

  // Stop webcam
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Take photo from webcam
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      onSelectImage(dataUrl);
      stopCamera();
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="ios-glass rounded-2xl p-4 sm:p-5 space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-white/90 tracking-wide uppercase font-serif">
          Upload Wajah
        </h2>

        {portraitImage && (
          <button
            type="button"
            onClick={() => onSelectImage(null)}
            className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white px-2.5 py-1 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] transition-all"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Ganti Foto</span>
          </button>
        )}
      </div>

      {cameraError && (
        <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs">
          {cameraError}
        </div>
      )}

      {/* Hidden File and Camera Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="user"
        className="hidden"
      />

      {/* Direct Upload & Camera Choice */}
      {!portraitImage && !isCameraActive && (
        <div className="grid grid-cols-2 gap-3 w-full">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl ios-glass-subtle hover:bg-white/[0.08] border border-white/[0.08] hover:border-amber-400/40 transition-all text-center active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Upload className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-white/90">
              Upload Foto
            </span>
          </button>

          <button
            type="button"
            onClick={startCamera}
            className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl ios-glass-subtle hover:bg-white/[0.08] border border-white/[0.08] hover:border-amber-400/40 transition-all text-center active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Camera className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-white/90">
              Kamera
            </span>
          </button>
        </div>
      )}

      {/* Camera Live Mode */}
      {isCameraActive && (
        <div className="relative rounded-2xl overflow-hidden bg-black/80 border border-white/10 aspect-[3/4] max-h-[300px] mx-auto flex flex-col items-center justify-center">
          <video
            ref={videoRef}
            playsInline
            muted
            className="w-full h-full object-cover transform -scale-x-100"
          />

          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 z-10 px-4">
            <button
              type="button"
              onClick={capturePhoto}
              className="px-4 py-2 rounded-xl bg-amber-400 text-zinc-950 font-bold text-xs hover:bg-amber-300 flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Ambil Foto</span>
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="px-3.5 py-2 rounded-xl bg-white/10 text-white/80 hover:text-white font-medium text-xs hover:bg-white/15 border border-white/10 active:scale-95 transition-all"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Photo Preview */}
      {portraitImage && (
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 aspect-[3/4] max-h-[260px] mx-auto flex items-center justify-center shadow-inner">
          <img
            src={portraitImage}
            alt="Wajah"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

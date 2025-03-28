import { Input, Row, Col, Button, Typography, Slider, Switch, message, Space } from 'antd';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

import { useEditorStore } from '@/store/editorStore';

const { Text } = Typography;

const SidebarMaterial = () => {
  const { selectedObject, setSelectedObject } = useEditorStore();
  const [material, setMaterial] = useState<THREE.Material | null>(null);
  const [uuid, setUuid] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [opacity, setOpacity] = useState(1);
  const [metalness, setMetalness] = useState(0);
  const [roughness, setRoughness] = useState(0);
  const [transparent, setTransparent] = useState(false);

  // ✅ **监听选中对象的变化**
  useEffect(() => {
    if (!selectedObject || !(selectedObject as THREE.Mesh).material) {
      setMaterial(null);
      return;
    }

    const mat = (selectedObject as THREE.Mesh).material as THREE.Material;
    setMaterial(mat);
    setUuid(mat.uuid);
    setName(mat.name || '');
    setType(mat.type);
    setOpacity(mat.opacity);
    setTransparent(mat.transparent);

    if ((mat as THREE.MeshStandardMaterial).metalness !== undefined) {
      setMetalness((mat as THREE.MeshStandardMaterial).metalness);
    }
    if ((mat as THREE.MeshStandardMaterial).roughness !== undefined) {
      setRoughness((mat as THREE.MeshStandardMaterial).roughness);
    }
  }, [selectedObject]);

  // ✅ **更新 Material 属性**
  const updateMaterial = (key: string, value: any) => {
    if (!material || !selectedObject) return;

    if (key === 'name') {
      material.name = value;
      setSelectedObject(selectedObject);
    } else if (key === 'opacity') {
      material.opacity = value;
      setOpacity(value);
    } else if (key === 'transparent') {
      material.transparent = value;
      setTransparent(value);
    } else if (key === 'metalness') {
      (material as THREE.MeshStandardMaterial).metalness = value;
      setMetalness(value);
    } else if (key === 'roughness') {
      (material as THREE.MeshStandardMaterial).roughness = value;
      setRoughness(value);
    }
    material.needsUpdate = true;
    setSelectedObject(selectedObject);
  };

  // ✅ **导出 JSON**
  const exportJSON = () => {
    if (!material) return;

    const output = JSON.stringify(material.toJSON(), null, 2);
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `${name || 'material'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    message.success('JSON 导出成功');
  };

  return (
    <div className="sidebar-material">
      {material ? (
        <Space direction="vertical" size="middle">
          {/* ✅ **类型** */}
          <Row>
            <Col span={6}>类型</Col>
            <Col span={18}>
              <Text>{type}</Text>
            </Col>
          </Row>
          {/* ✅ **UUID** */}
          <Row>
            <Col span={6}>UUID</Col>
            <Col span={18}>
              <Text copyable>{uuid}</Text>
            </Col>
          </Row>

          {/* ✅ **名称** */}
          <Row>
            <Col span={6}>名称</Col>
            <Col span={18}>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  updateMaterial('name', e.target.value);
                }}
              />
            </Col>
          </Row>

          {/* ✅ **透明开关** */}
          <Row>
            <Col span={8}>透明</Col>
            <Col span={16}>
              <Switch checked={transparent} onChange={(value) => updateMaterial('transparent', value)} />
            </Col>
          </Row>
          {/* ✅ **透明度** */}
          <Row>
            <Col span={6}>透明度</Col>
            <Col span={18}>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={opacity}
                onChange={(value) => updateMaterial('opacity', value)}
              />
            </Col>
          </Row>

          {/* ✅ **金属度** */}
          {type.includes('Standard') && (
            <Row>
              <Col span={6}>金属度</Col>
              <Col span={18}>
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={metalness}
                  onChange={(value) => updateMaterial('metalness', value)}
                />
              </Col>
            </Row>
          )}

          {/* ✅ **粗糙度** */}
          {type.includes('Standard') && (
            <Row>
              <Col span={6}>粗糙度</Col>
              <Col span={18}>
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={roughness}
                  onChange={(value) => updateMaterial('roughness', value)}
                />
              </Col>
            </Row>
          )}

          {/* ✅ **导出 JSON** */}
          <Button onClick={exportJSON} style={{ marginTop: 10 }}>
            导出 JSON
          </Button>
        </Space>
      ) : (
        <p>未选中材质</p>
      )}
    </div>
  );
};

export default SidebarMaterial;

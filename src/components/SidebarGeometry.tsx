import { Input, Row, Col, Button, Typography, message, Space } from 'antd';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

import { useEditorStore } from '@/store/editorStore';

const { Text } = Typography;

const SidebarGeometry = () => {
  const { selectedObject, setSelectedObject } = useEditorStore();
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [uuid, setUuid] = useState('');
  const [name, setName] = useState('');
  const [boundingBox, setBoundingBox] = useState([0, 0, 0]);
  const [userData, setUserData] = useState('{}');

  // ✅ **监听选中对象的变化**
  useEffect(() => {
    if (!selectedObject || !(selectedObject instanceof THREE.Mesh)) {
      setGeometry(null);
      return;
    }

    const geo = selectedObject.geometry as THREE.BufferGeometry;
    setGeometry(geo);
    setUuid(geo.uuid);
    setName(geo.name || '');
    setUserData(JSON.stringify(geo.userData, null, 2));

    if (!geo.boundingBox) geo.computeBoundingBox();
    if (geo.boundingBox) {
      const { max, min } = geo.boundingBox;
      setBoundingBox([
        parseFloat((max.x - min.x).toFixed(3)),
        parseFloat((max.y - min.y).toFixed(3)),
        parseFloat((max.z - min.z).toFixed(3)),
      ]);
    }
  }, [selectedObject]);

  // ✅ **更新 Geometry 属性**
  const updateGeometry = (key: string, value: any) => {
    if (!geometry || !selectedObject) return;

    if (key === 'name') {
      geometry.name = value;
      setSelectedObject(selectedObject);
    } else if (key === 'userData') {
      try {
        geometry.userData = JSON.parse(value);
        setUserData(value);
      } catch (error) {
        message.error('JSON 格式错误:' + error);
      }
    }
  };

  // ✅ **导出 JSON**
  const exportJSON = () => {
    if (!geometry) return;

    const output = JSON.stringify(geometry.toJSON(), null, 2);
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `${name || 'geometry'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    message.success('JSON 导出成功');
  };

  return (
    <div className="sidebar-geometry">
      {geometry ? (
        <Space direction="vertical" size="middle">
          <Row>
            <Col span={6}>类型</Col>
            <Col span={18}>
              <Text>{geometry.type}</Text>
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
                  updateGeometry('name', e.target.value);
                }}
              />
            </Col>
          </Row>

          {/* ✅ **尺寸 (Bounding Box)** */}
          <Row>
            <Col span={6}>尺寸</Col>
            <Col span={18}>
              {boundingBox.map((size, index) => (
                <Text key={index}>{size}</Text>
              ))}
            </Col>
          </Row>

          {/* ✅ **用户数据** */}
          <Row>
            <Col span={6}>用户数据</Col>
            <Col span={18}>
              <Input.TextArea rows={3} value={userData} onChange={(e) => updateGeometry('userData', e.target.value)} />
            </Col>
          </Row>

          {/* ✅ **导出 JSON** */}
          <Button onClick={exportJSON} style={{ marginTop: 10 }}>
            导出 JSON
          </Button>
        </Space>
      ) : (
        <p>未选中几何体</p>
      )}
    </div>
  );
};

export default SidebarGeometry;

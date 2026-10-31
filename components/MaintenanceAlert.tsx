import { Alert, List, Text } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'
import { MaintenanceConfig, MonitorTarget } from '@/types/config'

export default function MaintenanceAlert({
  maintenance,
}: {
  maintenance: Omit<MaintenanceConfig, 'monitors'> & { monitors?: MonitorTarget[] }
}) {
  return (
    <Alert
      icon={<IconAlertTriangle />}
      title={maintenance.title || 'Scheduled Maintenance'}
      color={maintenance.color || 'yellow'}
      withCloseButton={false}
      radius="lg"
      mt="xl"
    >
      <Text size="sm" c="dimmed" mb="xs">
        {new Date(maintenance.start).toLocaleString()} &ndash;{' '}
        {maintenance.end ? new Date(maintenance.end).toLocaleString() : 'Until further notice'}
      </Text>

      <Text>{maintenance.body}</Text>
      {maintenance.monitors && maintenance.monitors.length > 0 && (
        <>
          <Text mt="xs" fw={600}>
            Affected components:
          </Text>
          <List size="sm" withPadding>
            {maintenance.monitors.map((comp, compIdx) => (
              <List.Item key={compIdx}>{comp.name}</List.Item>
            ))}
          </List>
        </>
      )}
    </Alert>
  )
}

export type LogEvent = {
  id: string
  timestamp: Date
  action: string
  module: string
  details: Record<string, unknown>
}

export class EventLogger {
  private static readonly storageKey = "app_logs"
  private static readonly maxLogs = 500

  static log(module: string, action: string, details: Record<string, unknown> = {}): void {
    const event: LogEvent = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      action,
      module,
      details
    }

    try {
      const logs = this.getLogs()
      logs.push(event)

      if (logs.length > this.maxLogs) {
        logs.splice(0, logs.length - this.maxLogs)
      }

      localStorage.setItem(this.storageKey, JSON.stringify(logs))
    } catch (error) {
      console.error("Erro ao registrar evento:", error)
    }
  }

  static getLogs(): LogEvent[] {
    try {
      const stored = localStorage.getItem(this.storageKey)
      if (!stored) return []

      return JSON.parse(stored).map((log: Record<string, string>) => ({
        ...log,
        timestamp: new Date(log.timestamp)
      }))
    } catch (error) {
      console.error("Erro ao recuperar logs:", error)
      return []
    }
  }

  static getLogsByModule(module: string): LogEvent[] {
    return this.getLogs().filter(log => log.module === module)
  }

  static clearLogs(): void {
    try {
      localStorage.removeItem(this.storageKey)
    } catch (error) {
      console.error("Erro ao limpar logs:", error)
    }
  }

  static exportLogs(): string {
    const logs = this.getLogs()
    return JSON.stringify(logs, null, 2)
  }
}
